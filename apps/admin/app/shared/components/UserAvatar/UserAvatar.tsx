'use client';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type UserAvatarProps = {
    user: User | null;
    className?: string;
    avatarClassname?: string;
    imageOnly?: boolean;
    withLink?: boolean;
    url?: string | null;
};

export function UserAvatar({ user, url = null, className, avatarClassname, imageOnly = false, withLink = true }: UserAvatarProps) {
    const router = useRouter();

    const imageUrl = useMemo(() => {
        if (url) {
            return url;
        }
        if (user) {
            return user.image_url || '/images/default-avatar.png';
        }
        return '/images/default-avatar.png';
    }, [user, url]);
    return (
        <div
            {...(withLink
                ? {
                      onClick: (e) => {
                          e.stopPropagation();
                          if (user) {
                              router.push('/@' + user.username);
                          }
                      },
                  }
                : {})}
            className={cn('flex items-center gap-2', className, {
                'cursor-pointer': withLink,
            })}
        >
            <div className="shrink-0">
                <div className={cn('relative h-10 w-10', avatarClassname)}>
                    <Image
                        fetchPriority="auto"
                        className="rounded-full object-cover"
                        src={imageUrl}
                        alt={user?.name ?? 'Anonymous'}
                        loading="lazy"
                        fill
                    />
                </div>
            </div>
            {imageOnly ? null : (
                <div>
                    <h3 className="text-base">{user?.name ?? 'Anonymous'}</h3>
                    <p className="text-xs">{`@${user?.username ?? 'anonymous'}`}</p>
                </div>
            )}
        </div>
    );
}
